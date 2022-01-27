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
			

		

    