import { LiveStreamData } from "../entities/livedata";
import { ILiveRepository } from "../interfaces/repositories/live-repository";
import { ILiveInteractor } from "../interfaces/usecases/liveInteractor";

export class LiveInteractorImpl implements ILiveInteractor {
    constructor(private readonly repository: ILiveRepository) { }

    async addLive(data: LiveStreamData): Promise<void> {
        if (!data.userId || !data.roomID) {
            throw new Error("userId and roomID are required");
        }
        try {
            await this.repository.addLiveToDB(data);
        } catch (error) {
            console.error("Error adding live data:", error);
            throw new Error("Error adding live data");
        }
    }

    async removeLive(userId: string): Promise<void> {
        if (!userId ) {
            throw new Error("userId is required");
        }
        try {
            await this.repository.removeLiveFromDB(userId);
        } catch (error) {
            console.error("Error removing live data:", error);
            throw new Error("Error removing live data");
        }
    }


}