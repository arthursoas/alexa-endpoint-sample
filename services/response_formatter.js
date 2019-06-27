class ResponseFormatter {
  constructor(
		request,
		outputSpeech,
		card,
		repromptOutputSpeech,
		directives,
		shouldEndSession
	) {
		this.request = request;
		this.outputSpeech = outputSpeech;
		this.card = card;
		this.repromptOutputSpeech = repromptOutputSpeech;
		this.shouldEndSession = shouldEndSession;
	}

	formatResponse() {
		return {
			version: '1.0',
			sessionAttributes: {
				lastComunication: new Date().toISOString()
			},
			response: {
				outputSpeech: {...this.outputSpeech},
				card: {...this.card},
				reprompt: {
					outputSpeech: {...this.repromptOutputSpeech},
				},
				shouldEndSession: this.shouldEndSession
			}
		}
	}
}

module.exports = ResponseFormatter;