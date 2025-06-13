import React from 'react'

const DoctorPanel = () => {
  return (
    <div>
      
        {/* Main Dashboard Content */}
        <main className="p-6 md:p-10 space-y-10 text-base md:text-lg">
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">📅 Today's Appointments</h2>
              <p className="text-gray-700 mt-2">
                You have <strong>5</strong> appointments scheduled today.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-600 mb-2">🧍‍♂️ New Patients</h2>
              <p className="text-gray-700 mt-2">
                <strong>3</strong> new patients have registered.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-600 mb-2">💬 Messages</h2>
              <p className="text-gray-700 mt-2">
                <strong>2</strong> unread messages from patients.
              </p>
              
            </div>
          </section>
        </main>
    </div>
  )
}

export default DoctorPanel
