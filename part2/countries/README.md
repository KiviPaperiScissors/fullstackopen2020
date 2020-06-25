## Weather query app

In order to successfully get weather data with this app, you will need to set your own API key as an environmental attribute somehow. The app will look for an API key with 

	const api_key = process.env.REACT_APP_API_KEY

The weather data comes through fine for the first query, but later queries get the error message:

	"Your subscription plan does not support https encryption."

The reason for the error message is unknown to the author, because the queries should be the same every time.
