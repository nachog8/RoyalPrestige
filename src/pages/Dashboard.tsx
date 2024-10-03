import React from 'react'
import { Calendar, CheckSquare, Users } from 'lucide-react'

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="mr-2 text-blue-500" /> Upcoming Events
        </h2>
        <ul className="space-y-2">
          <li>Team Meeting - Tomorrow, 10:00 AM</li>
          <li>Project Deadline - Friday, 5:00 PM</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CheckSquare className="mr-2 text-green-500" /> Recent Tasks
        </h2>
        <ul className="space-y-2">
          <li>Complete UI Design - In Progress</li>
          <li>Write Documentation - Completed</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-purple-500" /> Team Activity
        </h2>
        <ul className="space-y-2">
          <li>Alice completed 3 tasks</li>
          <li>Bob added a new event</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard