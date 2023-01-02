import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  // const vote = (id) => {
  //   console.log('vote', id);
  // };

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
