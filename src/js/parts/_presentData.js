export const tableProducts = [
	{ id: 1, image: 'products/man-1.png', title: 'Повседневные', price: 450, seller: 'Lazana', vendor: 'FU8943386', status: 'close', selected: false },
	{ id: 2, image: 'products/man-2.png', title: 'Повседневные', price: 355, seller: 'Lazana', vendor: 'BU89336', status: 'open', selected: false },
	{ id: 3, image: 'products/man-3.png', title: 'Повседневные', price: 550, seller: 'Adrena', vendor: 'EU8937346', status: 'close', selected: false },
	{ id: 4, image: 'products/man-4.png', title: 'Повседневные', price: 150, seller: 'Lazana', vendor: 'KU8945386', status: 'close', selected: false },
	{ id: 5, image: 'products/man-5.png', title: 'Повседневные', price: 50, seller: 'Lazana', vendor: 'RU8937586', status: 'open', selected: false },
	{ id: 6, image: 'products/man-6.png', title: 'Повседневные', price: 1450, seller: 'Lazana', vendor: 'BU89d7386', status: 'close', selected: false },
	{ id: 7, image: 'products/woman-1.png', title: 'Повседневные', price: 44000, seller: 'Lazana', vendor: 'FU8943386', status: 'close', selected: false },
	{ id: 8, image: 'products/woman-2.png', title: 'Повседневные', price: 135, seller: 'Lazana', vendor: 'BU89336', status: 'open', selected: false },
	{ id: 9, image: 'products/woman-3.png', title: 'Повседневные', price: 750, seller: 'Adrena', vendor: 'EU8937346', status: 'open', selected: false },
	{ id: 10, image: 'products/woman-4.png', title: 'Повседневные', price: 40, seller: 'Lamoda', vendor: 'KU8945386', status: 'open', selected: false },
	{ id: 11, image: 'products/woman-5.png', title: 'Повседневные', price: 1200, seller: 'Silad', vendor: 'RU8937586', status: 'open', selected: false },
	{ id: 12, image: 'products/woman-6.png', title: 'Повседневные', price: 1300, seller: 'Axiony', vendor: 'BU89d7386', status: 'close', selected: false },
	{ id: 13, image: 'products/woman-3.png', title: 'Повседневные', price: 44400, seller: 'Lamoda', vendor: 'KU8945386', status: 'open', selected: false },
	{ id: 14, image: 'products/woman-4.png', title: 'Повседневные', price: 100, seller: 'Silad', vendor: 'RU8937586', status: 'open', selected: false },
	{ id: 15, image: 'products/woman-5.png', title: 'Повседневные', price: 15600, seller: 'Axiony', vendor: 'BU89d7386', status: 'close', selected: false },
]

export const tableOrders = [
	{
		id: 1,
		number: '870967',
		buyer: 'Кирилл Левушкин',
		price: 986,
		status: 'success',
		statusTxt: 'Завершен',
		selected: false,
		date: '10.08.2020'
	},
	{
		id: 2,
		number: '240967',
		buyer: 'Олег Сидорчук',
		price: 3244,
		status: 'deny',
		statusTxt: 'Отменен',
		selected: false,
		date: '09.11.2020'
	},
	{
		id: 3,
		number: '090967',
		buyer: 'Кирилл Левушкин',
		price: 754,
		status: 'process',
		statusTxt: 'В Обработке',
		selected: false,
		date: '08.02.2020'
	},
	{
		id: 4,
		number: '040321',
		buyer: 'Анна Курилова',
		price: 12314,
		status: 'success',
		statusTxt: 'Завершен',
		selected: false,
		date: '07.25.2020'
	},
	{
		id: 5,
		number: '120967',
		buyer: 'Олег Сидорчук',
		price: 8582,
		status: 'success',
		statusTxt: 'Завершен',
		selected: false,
		date: '06.26.2019'
	},
	{
		id: 6,
		number: '090967',
		buyer: 'Кирилл Левушкин',
		price: 44250,
		status: 'process',
		statusTxt: 'В Обработке',
		selected: false,
		date: '11.04.2018'
	},
	{
		id: 7,
		number: '450967',
		buyer: 'Анна Курилова',
		price: 4050,
		status: 'process',
		statusTxt: 'В Обработке',
		selected: false,
		date: '12.12.2020'
	},
	{
		id: 8,
		number: '050967',
		buyer: 'Олег Сидорчук',
		price: 50,
		status: 'deny',
		statusTxt: 'Отменен',
		selected: false,
		date: '12.06.2020'
	},
	{
		id: 9,
		number: '760967',
		buyer: 'Анна Курилова',
		price: 1250,
		status: 'process',
		statusTxt: 'В Обработке',
		selected: false,
		date: '12.10.2020'
	},
]

export const tableBuyerOrders = [
	{ id: 1, number: 'BU93738786', buyer: 'Повседневные платья', price: 40000, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 2, number: 'DU93738786', buyer: 'Повседневные платья', price: 12000, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 3, number: 'FU93738786', buyer: 'Повседневные платья', price: 12486, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 4, number: 'HU3738786', buyer: 'Повседневные платья', price: 439, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 5, number: 'BU93738786', buyer: 'Повседневные платья', price: 890, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 6, number: 'GU93738786', buyer: 'Повседневные платья', price: 2342, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 7, number: 'BU93738786', buyer: 'Повседневные платья', price: 5332, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 8, number: 'TU93738786', buyer: 'Повседневные платья', price: 256, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 9, number: 'KU93738786', buyer: 'Повседневные платья', price: 9142, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 10, number: 'BU11738786', buyer: 'Повседневные платья', price: 7853, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 11, number: 'BU93738786', buyer: 'Повседневные платья', price: 256, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 12, number: 'BU93738786', buyer: 'Повседневные платья', price: 98754, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false },
	{ id: 13, number: 'BU93738786', buyer: 'Повседневные платья', price: 120345, status: 'success', statusTxt: 'Завершен', date: '10.08.2020', selected: false }
]