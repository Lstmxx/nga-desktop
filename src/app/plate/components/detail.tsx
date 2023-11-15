'use client';

import getPlateDetail from '@/lib/api/plate/get-plate-detail';
import { useEffect, useState } from 'react';

type Prop = {
	id: string;
};

export default function Detail({ id }: Prop) {
	const [page, setPage] = useState(1);
	const handleGetPlateDetail = () => {
		getPlateDetail({ id, page });
	};
	useEffect(() => {
		handleGetPlateDetail();
	}, []);
	return <div>detail</div>;
}
