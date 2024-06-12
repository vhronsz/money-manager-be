class ResponseDto{
    ok;
    message;
    data;
    
    constructor(ok, message, data){
        this.ok = ok;
        this.message = message;
        this.data = data;
    }
}

module.exports = ResponseDto;