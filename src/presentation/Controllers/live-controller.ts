import { Request, Response } from "express";
import { ILiveInteractor } from "../../domain/interfaces/usecases/liveInteractor";
import { LiveStreamData } from "../../domain/entities/livedata";

export class LiveController {
    constructor(private readonly interactor: ILiveInteractor) { }
    async onAddLive(req: Request, res: Response): Promise<Response> {
        try {
            
          const data: LiveStreamData = req.body.liveStreamData;
          console.log('DTAA',data);

          await this.interactor.addLive(data);
          return res.status(201).json({ message: "Live data added successfully" });
        } catch (error) {
          console.error("Error adding live data:", error);
          return res.status(400).json({ message: error.message });
        }
      }

      async onRemoveLive(req: Request, res: Response): Promise<Response> {
        try {
          const userId: string = req.params.userId;
          await this.interactor.removeLive(userId);
          return res.status(201).json({ message: "Live data removed successfully" });
        } catch (error) {
          console.error("Error removing live data:", error);
          return res.status(400).json({ message: error.message });
        }
      }
}