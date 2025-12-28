import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { TipJarPage } from './pages/TipJar/TipJarPage';
import { PollsPage } from './pages/SocialPolls/PollsPage';
import { CreatePollPage } from './pages/SocialPolls/CreatePollPage';
import { initFarcasterSDK } from './config/farcaster';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize Farcaster SDK on mount
    initFarcasterSDK();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tip-jar" element={<TipJarPage />} />
        <Route path="/polls" element={<PollsPage />} />
        <Route path="/polls/create" element={<CreatePollPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
