import { Link } from "react-router-dom"

export const User = ({id, fullName, email}) => {
    return <section className="user">
    <div><Link to={`/users/${id}`}>Name: {fullName}</Link></div>
    <div>Email: {email}</div>
</section>
}