import React, { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { X, Clock, Edit } from 'lucide-react'

const localizer = momentLocalizer(moment)

interface Event {
  id: number
  title: string
  description: string
  start: Date
  end: Date
  allDay: boolean
  user: string
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Discuss project progress',
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    allDay: false,
    user: 'Alice'
  },
  {
    id: 2,
    title: 'Project Deadline',
    description: 'Submit final deliverables',
    start: new Date(2024, 2, 18, 9, 0),
    end: new Date(2024, 2, 18, 17, 0),
    allDay: true,
    user: 'Bob'
  },
]

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    user: 'Current User'
  })
  const [editingEventId, setEditingEventId] = useState<number | null>(null)

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ ...newEvent, start, end })
    setEditingEventId(null)
    setShowModal(true)
  }

  const handleSelectEvent = (event: Event) => {
    setNewEvent(event)
    setEditingEventId(event.id)
    setShowModal(true)
  }

  const handleCreateOrUpdateEvent = () => {
    if (newEvent.title) {
      if (editingEventId) {
        setEvents(events.map(event => event.id === editingEventId ? { ...newEvent, id: editingEventId } as Event : event))
      } else {
        setEvents([...events, { ...newEvent, id: Date.now() } as Event])
      }
      setShowModal(false)
      resetNewEvent()
    }
  }

  const resetNewEvent = () => {
    setNewEvent({
      title: '',
      description: '',
      start: new Date(),
      end: new Date(),
      allDay: false,
      user: 'Current User'
    })
    setEditingEventId(null)
  }

  const eventStyleGetter = (event: Event) => {
    const style = {
      backgroundColor: event.allDay ? '#34D399' : '#60A5FA',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return { style }
  }

  return (
    <div className="h-screen p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Team Calendar</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={(event) => `${event.title} - ${event.user}\n${event.description}`}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      />

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingEventId ? 'Edit Event' : 'Create New Event'}</h2>
              <button onClick={() => { setShowModal(false); resetNewEvent(); }} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full p-2 mb-4 border rounded"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <textarea
              placeholder="Event Description"
              className="w-full p-2 mb-4 border rounded"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="allDay"
                checked={newEvent.allDay}
                onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="allDay" className="flex items-center cursor-pointer">
                <Clock size={16} className="mr-1" />
                All Day Event
              </label>
            </div>
            {!newEvent.allDay && (
              <>
                <input
                  type="datetime-local"
                  className="w-full p-2 mb-4 border rounded"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                />
                <input
                  type="datetime-local"
                  className="w-full p-2 mb-4 border rounded"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                />
              </>
            )}
            <button
              onClick={handleCreateOrUpdateEvent}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
            >
              <Edit size={20} className="mr-2" />
              {editingEventId ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar