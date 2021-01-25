import { withRouter } from 'next/router'

const a = ({router}) => {
    const { a } = router.query
    return (
        <div>这是a页面 {a}</div>
    )
}

export default withRouter(a)
