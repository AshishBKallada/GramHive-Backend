import userModel from "../data/data-sources/mongodb/models/user"

export const getUserName = async (userId: string): Promise<any> => {
    const user = await userModel.findById(userId);
    if (user) {
        const username = user.username
        return username;
    }
}