import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Wearables from './pages/Wearables';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Referral from './pages/Referral';
import Payment from './pages/Payment';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="wearables" element={<Wearables />} />
          <Route path="plans" element={<Plans />} />
          <Route path="profile" element={<Profile />} />
          <Route path="referral" element={<Referral />} />
          <Route path="payment" element={<Payment />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
