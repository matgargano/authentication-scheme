import useRequireAuth from "../hooks/useRequireAuth";

const WelcomePage = () => {
    useRequireAuth();
    return <p>WELCOME!</p>
}

export default WelcomePage;