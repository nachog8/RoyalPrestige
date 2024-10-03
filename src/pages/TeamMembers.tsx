import React from 'react'
import { User } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 2, name: 'Bob Smith', role: 'Developer', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Carol Williams', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
]

const TeamMembers: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map(member => (
          <div key={member.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamMembers