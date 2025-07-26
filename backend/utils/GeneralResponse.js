
export class GeneralResponse{
    constructor(status,statusCode,data=null,message=null)
    {
        this.status=status;
        this.statusCode=statusCode;
        this.data=data;
        this.message=message
    }
}
