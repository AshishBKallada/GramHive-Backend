import { User } from "../../entities/user"

export interface IChatRepository {
    checkIfChatExists(userId: string, currentUserId: string): Promise<any>
    createChat(userId: string, currentUserId: string): Promise<any>
    getChats(userId: string): Promise<any>
    createGroupChat(groupData: any): Promise<any>
    updateGroupName(groupId:string,groupName: string): Promise<any>
    addTogroup(groupId:string,users:User[]): Promise<any>
    removeFromGroup(groupId:string,users:User[]): Promise<any>
    deleteGroup(groupId:string): Promise<any>
}