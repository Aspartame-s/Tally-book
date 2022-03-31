import React from 'react';

class PriceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            price: null,
            date: '',
            status: 'none',
            tipText: '',
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.props)
        const isEdit = this.props.isEdit
        if(isEdit) {
            //edit
            console.log(this.props.editItem)
            console.log(this.state.title)
            const title = this.state.title ? this.state.title : this.props.editItem.title
            const price = this.state.price ? this.state.price : this.props.editItem.price
            const date = this.state.date ? this.state.date : this.props.editItem.date
            const updateData = {...this.props.editItem, title, price, date}
            console.log(updateData)
            this.props.onSubmit(updateData, isEdit)
        }else {
            //create
            if (!this.state.title || !this.state.title || 0 >= this.state.title || !this.state.date) {
                this.setState({
                    status: 'block'
                })
            }
            if (!this.state.title) {
                this.setState({
                    tipText: '请输入标题'
                })
                return
            } else if (!this.state.title) {
                this.setState({
                    tipText: '请输入价格'
                })
                return
            } else if (0 >= this.state.title) {
                this.setState({
                    tipText: '价格必须大于0'
                })
                return
            } else if (!this.state.date) {
                this.setState({
                    tipText: '请输入日期'
                })
                return
            } else {
                this.setState({
                    tipText: '',
                    status: 'none'
                })
            }
            const submitData = {
                title: this.state.title,
                price: this.state.price,
                date: this.state.date
            }
            this.props.onSubmit(submitData, isEdit)
        }
        
    }
 
    handleTitle = (e) => {
        console.log(e.target.value)
        this.setState({
            title: e.target.value
        })
    }
    handlePrice = (e) => {
        console.log(e.target.value)
        this.setState({
            price: e.target.value
        })
    }
    handleDate = (e) => {
        console.log(e.target.value)
        this.setState({
            date: e.target.value
        })
    }
    render() {
        // const {onSubmit, onCancel} = this.props
        const {price, date, title} = this.props.editItem
        const { status, tipText } = this.state
        return (
            <React.Fragment>
                <form style={{ textAlign: 'left', padding: '10px' }} onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputTitle">标题</label>
                        <input type="text" className="form-control" id="exampleInputTitle" defaultValue={title} placeholder='请输入标题' onChange={this.handleTitle} />
                    </div>
                    <div className="form-group has-error">
                        <label htmlFor="exampleInputPrice">价格</label>
                        <input type="number" className="form-control" id="exampleInputPrice" defaultValue={price} placeholder='请输入价格' onChange={this.handlePrice} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label htmlFor="exampleInputDate">日期</label>
                        <input type="date" className="form-control" id="exampleInputDate" defaultValue={date}  onChange={this.handleDate} />
                    </div>
                    <div style={{ display: status, width: '100%', height: '50px', margin: '10px 0', background: 'pink', lineHeight: '50px', padding: '0 10px' }}>{tipText}</div>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '40px' }}>提交</button>
                    <div className="btn btn-primary" onClick={() => { this.props.onCancel(123) }}>取消</div>
                </form>
            </React.Fragment>
        )
    }
}

export default PriceForm