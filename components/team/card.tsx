export function TeamCard({ team }) {
  return (
    <div className="border border-gray-700 p-4 rounded-lg">
      <Image 
        src={team.logo} 
        alt={team.name} 
        width={100}
        height={100}
      />
      <h3>{team.name}</h3>
    </div>
  )
}
