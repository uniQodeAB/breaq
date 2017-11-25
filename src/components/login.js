
login = () => {
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            this.setState({
                user
            });
        });
}

logout = () => {
    auth.signOut()
        .then(() => {
            this.setState({
                user: null
            });
        });
}

e