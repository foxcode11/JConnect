import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const Profile = () => {
  const { club, showAlert, displayAlert, updateClub, isLoading } =
    useAppContext()

  const [name, setName] = useState(club?.name)
  const [email, setEmail] = useState(club?.email)
  // const [lastName, setLastName] = useState(club?.lastName)
  const [location, setLocation] = useState(club?.location)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const club = await localStorage.getItem('club');
    const clubId = club.slice(club.indexOf(`"`,6)+1, club.indexOf(`"`, 10));
    console.log(clubId);
    if (!name || !email || !location || !clubId) {
      displayAlert();
      return
    }
    updateClub({ clubId, name, email, location })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {/* {isLoading ? 'Please Wait...' : 'save changes'} */}
            Save Changes
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
