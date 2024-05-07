import { User } from "../../entities/user"

export interface IChatInteractor {
    accessChat(userId: string, currUserId: string): Promise<any>
    fetchChat(userId: string): Promise<any>
    createGroup(groupName: string,users:User[],adminId:string): Promise<any>
}