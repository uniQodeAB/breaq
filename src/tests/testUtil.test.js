import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

export default function configureEnzyme() {
  Enzyme.configure({ adapter: new Adapter() });
}
