

const Usercard=({user})=>{

const {firstName,lastName,age,gender,skills,about,photoUrl}=user;
    return (
        <div className="flex justify-center">
<div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    { age && gender && <p>{gender},{age}</p>}
    {skills}
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Interested</button>
      <button className="btn btn-secondary">Ignore</button>
    </div>
  </div>
</div>
        </div>
    )
}

export default Usercard;