
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faFacebook, 
  faDiscord, 
  faTelegram, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-dark-bg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full cyber-gradient"></div>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                AstroMine
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              The future of mining simulation with cutting-edge technology and futuristic design.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navigate</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/tasks" className="text-sm text-gray-400 hover:text-white transition-colors">Tasks</Link>
              <Link to="/referrals" className="text-sm text-gray-400 hover:text-white transition-colors">Referrals</Link>
              <Link to="/profile" className="text-sm text-gray-400 hover:text-white transition-colors">Profile</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AstroMine. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <FontAwesomeIcon icon={faDiscord} size="lg" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <FontAwesomeIcon icon={faTelegram} size="lg" />
              <span className="sr-only">Telegram</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
