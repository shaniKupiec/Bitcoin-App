import contactService from '../../services/contact.service'

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().contactModule
      const contacts = await contactService.query(filterBy)
      dispatch({ type: 'SET_CONTACTS', contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveContact(contact) {
  return async (dispatch) => {
    try {
      await contactService.save(contact)
      contact._id ? dispatch({ type: 'UPDATE_CONTACT', contact }) : dispatch({ type: 'ADD_CONTACT', contact })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.remove(contactId)
      dispatch({ type: 'REMOVE_CONTACT', contactId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function getContactById(contactId) {
  return async () => {
    try {
      const user = await contactService.getById(contactId)
      return user
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
