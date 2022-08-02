import { Request, Response } from "express";
import { GetProofService } from "../services";
import { ResponseWriter } from "../utils";

class GetProof {
  private getProofservice = GetProofService;
  private responseWriter = ResponseWriter;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.getProofservice().execute(req.body);
      this.responseWriter.success(res, 201, response);
    } catch (err) {
      this.responseWriter.error(res, err as Error);
    }
  }
}

export { GetProof };
