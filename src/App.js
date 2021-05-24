import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoriesList from './pages/admin/CategoriesList';
import CategoryDetails from './pages/admin/CategoryDetails';
import SubcategoryDetails from './pages/admin/SubcategoryDetails';
import AdminUserList from './pages/admin/AdminUserList';
import AdminGigList from './pages/admin/AdminGigList';
import LandingPage from './pages/authentication/LandingPage';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Gigs from './pages/gigs/Gigs';
import GigsRecommended from './pages/gigs/GigsRecommended';
import GigDetails from './pages/gigs/GigDetails';
import AddGigForm from './pages/gigs/AddGigForm';
import HirerDetail from './pages/hirers/HirerDetails';
import HirerFav from './pages/hirers/HirerFav';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProfilePage from './pages/profiles/ProfilePage';
import ReviewForm from './pages/reviews/ReviewForm';
import HirerReview from './pages/reviews/HirerReview';
import TalentReview from './pages/reviews/TalentReview';
import TalentDetails from './pages/talents/TalentDetails';
import TalentFav from './pages/talents/TalentFav';
import Talents from './pages/talents/Talents';
import HeaderContainer from './components/headers/HeaderContainer';

// Route component based on user role
import AdminRoute from './components/routes/AdminRoute';
import HirerRoute from './components/routes/HirerRoute';
import TalentRoute from './components/routes/TalentRoute';
import SharedRoute from './components/routes/SharedRoute';
import PublicRoute from './components/routes/PublicRoute';

import {checkAuth, setFailedStatus} from './slices/authenticationSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.access) {
      dispatch(checkAuth());
      console.log('ok');
    } else {
      dispatch(setFailedStatus())
    }
  }, []);

  return (
    <Router>
      <HeaderContainer />
      <div className="App">
        <Switch>
          {/* Routes pre-authentication */}
          <PublicRoute exact path="/" component={LandingPage} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />

          {/* Routes for admin only */}
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path="/admin/categories"
            component={CategoriesList}
          />
          <AdminRoute
            exact
            path="/admin/categories/:id"
            component={CategoryDetails}
          />
          <AdminRoute
            exact
            path="/admin/subcategories/:id"
            component={SubcategoryDetails}
          />
          <AdminRoute
            exact
            path="/admin/maintenance/users"
            component={AdminUserList}
          />
          <AdminRoute
            exact
            path="/admin/maintenance/gigs"
            component={AdminGigList}
          />

          {/* Routes for log in hires only */}
          <HirerRoute exact path="/gigs/create" component={AddGigForm} />
          <HirerRoute exact path="/talents" component={Talents} />
          <HirerRoute exact path="/hirer/mygigs" component={HirerFav} />

          {/* Routes for log in talents only */}
          <TalentRoute exact path="/gigs" component={Gigs} />
          <TalentRoute
            exact
            path="/gigs/recommended"
            component={GigsRecommended}
          />
          <TalentRoute exact path="/talent/mygigs" component={TalentFav} />

          {/* Routes for log in hirer or talent */}
          <SharedRoute exact path="/profile" component={ProfilePage} />
          <SharedRoute exact path="/gigs/:id" component={GigDetails} />
          <SharedRoute exact path="/talents/:id" component={TalentDetails} />
          <SharedRoute exact path="/hirers/:id" component={HirerDetail} />
          <SharedRoute
            exact
            path="/notifications"
            component={NotificationsPage}
          />
          <SharedRoute exact path="/gigs/:id/review" component={ReviewForm} />
          <SharedRoute exact path="/hirer-review/:id" component={HirerReview} />
          <SharedRoute
            exact
            path="/talent-review/:id"
            component={TalentReview}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
