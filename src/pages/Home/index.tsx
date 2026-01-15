export function Home() {
  const mock = [
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
    { title: 'Red dead', picture: 'text', rating: 10 },
  ];
  return (
    <div>
      <div className='w-full flex'>
        <div className='w-[10%] p-10'>
          <h2 className='mb-2 font-bold'>Sort By</h2>
          <p>Popularity</p>
          <p>Release Date</p>

          <h2 className='my-2 font-bold'>Platforms</h2>
          <p>PC</p>
          <p>Playstation</p>
          <p>Xbox</p>
          <p>Nintendo</p>

          <h2 className='my-2 font-bold'>Genres</h2>
          <p>Action</p>
          <p>RPG</p>
          <p>Indie</p>
        </div>
        <div className='border border-neutral-800' />
        <div className='w-[90%] p-10'>
          <div className='grid grid-cols-5 gap-4'>
            {mock.map((game) => {
              return (
                <div className='flex flex-col border min-w-50 min-h-60  rounded-lg'>
                  <div className='h-[80%] border rounded-lg m-1 mb-0'>
                    <p>{game.rating}</p>
                    <p>{game.picture}</p>
                  </div>
                  <div className='p-2 flex justify-between'>
                    <p>{game.title}</p>
                    <div className='flex gap-1'>
                      <p>T</p>
                      <p>P</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
