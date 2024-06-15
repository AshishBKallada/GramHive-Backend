import { LiveStreamData } from "../../entities/livedata";

export interface ILiveInteractor {
    addLive(data: LiveStreamData): Promise<void>
    removeLive(userId: string): Promise<void>
}