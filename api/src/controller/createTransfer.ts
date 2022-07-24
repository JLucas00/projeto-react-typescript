import { Request, Response } from "express";
import { CreateTransferService } from "../services";
import { ResponseWriter } from "../utils";

class CreateTransfer {
  private service = CreateTransferService;
  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.service().execute(req.body);
      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { CreateTransfer };
