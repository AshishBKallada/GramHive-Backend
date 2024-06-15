import { LiveModel } from "../../data/data-sources/mongodb/models/live";
import { LiveStreamData } from "../entities/livedata";
import { ILiveRepository } from "../interfaces/repositories/live-repository";

export class LiveRepositoryImpl implements ILiveRepository {
    async addLiveToDB(data: LiveStreamData): Promise<void> {
        const liveStreamData = new LiveModel(data);
        try {
            await liveStreamData.save();
        } catch (error) {
            console.error("Error saving live data:", error);
            throw new Error("Error adding live data");
        }
    }
    async removeLiveFromDB(userId: string): Promise<void> {
        try {
            await LiveModel.findByIdAndDelete(userId);
        } catch (error) {
            console.error("Error saving live data:", error);
            throw new Error("Error adding live data");
        }
    }


}