import api from './api'

const EventosAPI = {
  saveEvent: async (values) => {
    let returnFromApi
    await api
      .post('/events/submit-event', {
        rg_title: values.rg_title,
        rg_date_begin: values.rg_date_begin,
        rg_date_end: values.rg_date_end,
        rg_date_begin_show: values.rg_date_begin_show,
        rg_date_end_visu: values.rg_date_end_visu,
        rg_site: values.rg_site,
        rg_description: values.rg_description,
        rg_document: values.rg_document,
        rg_show_by_time: values.rg_show_by_time,
        rg_status: values.rg_status,
        rg_local: values.rg_local
      })
      .then((res) => {
        returnFromApi = res
      })
    return returnFromApi.data
  },
  getEvents: async (values) => {
    let returnFromApi
    await api
      .post('/events/get-events', {
        rg_id_events: values.rg_id_events,
        rg_title: values.rg_title,
        rg_date_begin: values.rg_date_begin,
        rg_date_end: values.rg_date_end,
        rg_date_begin_show: values.rg_date_begin_show,
        rg_date_end_visu: values.rg_date_end_visu,
        rg_site: values.rg_site,
        rg_description: values.rg_description,
        rg_document: values.rg_document,
        rg_show_by_time: values.rg_show_by_time,
        rg_status: values.rg_status,
        rg_local: values.rg_local
      })
      .then((res) => {
        returnFromApi = res
      })
    return returnFromApi.data
  },
  getEventsShow: async () => {
    const returnFromApi = await api.get('/events/get-eventsshow')
    return returnFromApi.data
  },
  saveDocument: async (values) => {
    let returnFromApi
    await api.post('/events/save-documents', values).then((res) => {
      returnFromApi = res.data
    })
    return returnFromApi
  },
  getImage: async () => {
    const returnFromApi = await api.get('/events/get-image')
    return returnFromApi.data
  },
  updateEvent: async (values) => {
    let returnFromApi
    await api
      .post('/events/update-event', {
        rg_id_events: values.rg_id_events,
        rg_title: values.rg_title,
        rg_date_begin: values.rg_date_begin,
        rg_date_end: values.rg_date_end,
        rg_date_begin_show: values.rg_date_begin_show,
        rg_date_end_visu: values.rg_date_end_visu,
        rg_site: values.rg_site,
        rg_description: values.rg_description,
        rg_document: values.rg_document,
        rg_show_by_time: values.rg_show_by_time,
        rg_status: values.rg_status,
        rg_local: values.rg_local
      })
      .then((res) => {
        returnFromApi = res
      })
    return returnFromApi.data
  },
  deleteEvent: async (values) => {
    let returnFromApi
    await api
      .post('/events/delete-event', {
        rg_id_events: values.rg_id_events
      })
      .then((res) => {
        returnFromApi = res
      })
    return returnFromApi.data
  }
}

export default EventosAPI
