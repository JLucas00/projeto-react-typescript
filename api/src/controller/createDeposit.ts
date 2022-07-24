import { Request, Response } from "express";
import { CreateDepositService } from "../services";
import { ResponseWriter } from "../utils";

class CreateDeposit {
  private service = CreateDepositService;
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

export { CreateDeposit };
