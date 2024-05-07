export interface IChatRepository {
    checkIfChatExists(userId: string, currentUserId: string): Promise<any>
    createChat(userId: string, currentUserId: string): Promise<any>
    getChats(userId: string): Promise<any>
    createGroupChat(groupData: any): Promise<any>
}