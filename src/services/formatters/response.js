export default class ResponseFormatter {
  constructor(
            outputSpeech = undefined,
            card = undefined,
            repromptOutputSpeech = undefined,
            directives = undefined,
            shouldEndSession = false
    ) {
        this.outputSpeech = outputSpeech;
        this.card = card;
        this.repromptOutputSpeech = repromptOutputSpeech;
        this.shouldEndSession = shouldEndSession;
        this.directives = directives;
    }

    formatResponse() {
        return {
            version: '1.0',
            sessionAttributes: {
                lastComunication: new Date().toISOString()
            },
            response: {
                outputSpeech: this.outputSpeech,
                card: this.card,
                reprompt: {
                    outputSpeech: this.repromptOutputSpeech,
                },
                directives: this.directives,
                shouldEndSession: this.shouldEndSession
            }
        }
    }
}
