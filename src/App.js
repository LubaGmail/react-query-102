import React, { useState } from "react";
import  './App.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql
} from "@apollo/client";

// cache-first policy is Apollo Client's default fetch policy
const client = new ApolloClient({
  uri: "https://71z1g.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;


 // useQuery hook exposes our query's current loading state
function Dogs({ onDogSelected }) {
 
  // const { loading, error, data } = useQuery(GET_DOGS);

  // const { loading, error, data } = useQuery(GET_DOGS, {
  //   fetchPolicy: "network-only"      // Doesn't check cache before making a network request
  // });

  const { loading, error, data } = useQuery(GET_DOGS, {
    fetchPolicy: "network-only",     // Used for first execution
    // nextFetchPolicy: "cache-first"   // Used for subsequent executions
    nextFetchPolicy: "cache-and-networ"
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map(dog => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}

const DogPhoto = ({ breed }) => {
  // The useQuery hook's result object provides fine-grained information about the status
  //   of the query via the networkStatus property
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === 4) return <p>Refetching!</p>;
  if (loading) return null;
  if (error) return `Error!: ${error}`;

  return (
    <div>
      <div>
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      </div>
      <button onClick={() => refetch()}>
        Refetch!
      </button>
    </div>
  );
}

function DelayedQuery() {
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h3>useLazyQuery</h3>
      {data?.dog && <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />}
      <br />
      <button onClick={() => getDog({ variables: { breed: 'bulldog' } })}>
        Click me!
      </button>
    </div>
  );
}

function App() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    setSelectedDog(target.value);
  }

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h2>useQuery</h2>

        {selectedDog && <DogPhoto breed={selectedDog} />}

        <Dogs onDogSelected={onDogSelected} />

        <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
        <hr />

        <DelayedQuery />

      </div>
    </ApolloProvider>
  );
}

export default App
