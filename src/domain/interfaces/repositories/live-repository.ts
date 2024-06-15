import { LiveStreamData } from "../../entities/livedata";

export interface ILiveRepository {
    addLiveToDB(data: LiveStreamData): Promise<void>
    removeLiveFromDB(userId: string): Promise<void>
}