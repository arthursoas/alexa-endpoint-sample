class LaunchRequest {
  constructor(request) {
    this.request = request;
    this.isNew = this._isNew();
  }

  generateAnswer() {
    if (this.isNew) {
      return 'Olá, seja bem vindo ao Sempre Fit Modas!'
    } else {
      return 'Desculpe, não entendi.'
    }
  }

  // Private
  _isNew() {
    return this.request.session.new;
  }
}

module.exports = LaunchRequest;