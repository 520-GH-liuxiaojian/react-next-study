import { Button } from 'antd'
import Link  from 'next/link'
import router  from 'next/router'

export default () => {

    function goA() {
        router.push({
            pathname: '/a',
            query: { a: 1 }
        }, '/a/1')
    }

    return (
        <div>
            {/*通过 as 参数就可以实现路由映射*/}
            <Link href='/a?a=1' title='这是什么嘛!!' as='/a/1' >
                <Button type="primary">标签跳A</Button>
            </Link>
            <Button type="primary" onClick={goA}>js跳A</Button>
        </div>
    )
}
