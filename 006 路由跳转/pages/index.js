import { Button } from 'antd'
import Link  from 'next/link'
import router  from 'next/router'

export default () => {

    function goA() {
        router.push('/a')
    }

    return (
        <div>
            <Link href='/a'>
                <Button type="primary">标签跳A</Button>
            </Link>
            <Button type="primary" onClick={goA}>js跳A</Button>
        </div>
    )
}
