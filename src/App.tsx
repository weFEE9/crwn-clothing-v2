import './categories.styles.scss'

const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      subtitle: 'Shop Now',
    },
    {
      id: 2,
      title: 'Jackets',
      subtitle: 'Shop Now',
    },
    {
      id: 3,
      title: 'Sneakers',
      subtitle: 'Shop Now',
    },
    {
      id: 4,
      title: 'Womens',
      subtitle: 'Shop Now',
    },
    {
      id: 5,
      title: 'Mens',
      subtitle: 'Shop Now',
    },
  ];

  return (
    <div className='categories-container'>
      {categories.map((category) => {
        const { id, title, subtitle } = category;
        return (
          <div key={id} className='category-container'>
            <div className='background-image' />
            <div className='category-body-container'>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
