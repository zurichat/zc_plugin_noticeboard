import './NoticeBoard.css'
import NoticeBoardHeader from './NoticeBoardHeader'
import AdminNotice from '../NoticeBoard/noticeBoardComponent/AdminNotice'
import NoticeCard from '../NoticeCard/NoticeCard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function NoticeBoard () {
  return (
    <div className='notice'>
      <NoticeBoardHeader />
      <Switch>
        {/* <Route path="/create-notice">
          this component should be created in the NoticeBoard/noticeBoard folder <CreateNotice />
        </Route> */}
        <Route path='/admin-notice'>
          <AdminNotice />
        </Route>
        {/* <Route path="/">
          this component should be created in the NoticeBoard/noticeBoard folder  remember to create a link for the View Notice Button that routes to admin-notice above <UserNotice />
        </Route> */}
        <NoticeCard />
      </Switch>
    </div>
  )
}

export default NoticeBoard
