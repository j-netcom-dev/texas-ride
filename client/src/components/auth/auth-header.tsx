interface AuthHeaderPropsType {
    title: string,
}


const AuthHeader = ({ title}: AuthHeaderPropsType) => {
  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}

export default AuthHeader;