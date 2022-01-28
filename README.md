useLazyQuery React hook
	The useLazyQuery hook is perfect for executing queries in response to events besides component rendering.

doc-tut
    https://www.apollographql.com/docs/react/data/queries/

working app 
    https://codesandbox.io/s/queries-example-app-final-nrlnl

GraphiQL
    query dog($breed: String!) 
    {
        dog(breed: $breed) {
        id
        displayImage
        }
    }
    {
        "breed": "african"
    }

Supported fetch polocies
    https://www.apollographql.com/docs/react/data/queries/

	query ops
		query
		variables
		errorPolicy
		onCompleted
		onError
		skip
		displayName
	
	Networking ops
		pollInterval
		notifyOnNetworkStatusChange
		context
		ssr
		client
	
	Caching ops
		fetchPolicy
		nextFetchPolicy
		returnPartialData
		
	Result
		data
		previousData
		error
		variables
		
		Network Info
			loading
			networkStatus
			client
			called
			
		Helper functions
			refetch
			fetchMore
			startPolling
			subscribeToMore
			updateQuery
			
How does it work?
	when you call useLazyQuery, it does not immediately execute its associated query. Instead, it returns a query function in its result tuple that you call whenever you're ready to execute the query.

	cache-first policy is Apollo Client's default fetch policy.
	loading is true (indicating the query is still in flight)

Supported fetch policies
	cache-first
	cache-only
	cache-and-network
	network-only
	no-cache		Similar to network-only, except the query's result is not stored in the cache.
	standby			Uses the same logic as cache-first, except this query does not automatically update when underlying field values change. 



		

    