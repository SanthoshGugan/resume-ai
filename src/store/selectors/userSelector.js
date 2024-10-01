
const userSignOutSelector = state => state?.user?.signOut;
const userIdSelector = state => state?.user.userId;

export {
    userSignOutSelector,
    userIdSelector
}