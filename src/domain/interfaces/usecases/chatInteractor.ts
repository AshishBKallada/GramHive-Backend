import { User } from "../../entities/user"

export interface IChatInteractor {
    accessChat(userId: string, currUserId: string): Promise<any>
    fetchChat(userId: string): Promise<any>
    createGroup(groupName: string,users:User[],adminId:string): Promise<any>
    renameGroup(groupId: string,newName:string): Promise<any>
    addToGroup(groupId:string,users:User[]) : Promise<any>
    removeFromGroup(groupId:string,users:User[]) : Promise<any>
    deleteGroup(groupId:string) : Promise<any>
}