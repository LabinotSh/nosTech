// import mailchimp from '@mailchimp/mailchimp_marketing'

const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const router = express.Router()

const app = express()

// app.use(
//   express.static(
//     path.join(__dirname, '../../nos-tech/src/components/footer/Footer.js')
//   )
// )

router.post('/', (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    res.redirect('../../nos-tech/src/components/subscription/Subscription.js')
    return
  }

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FULLNAME: name,
        },
      },
    ],
  }

  const postData = JSON.stringify(data)
  console.log(postData)

  const options = {
    url: 'https://us2.api.mailchimp.com/3.0/lists/46250b494d',
    method: 'POST',
    headers: {
      Authorization: 'auth 90f51291e4501fcdb3cd221aa4dbbde6-us2',
    },
    body: postData,
  }

  request(options, (err, response) => {
    if (err) {
      console.log(err)
      // res.redirect('../../nos-tech/src/components/subscription/Subscription.js')
    } else {
      if (response.statusCode === 200) {
        console.log('response')
        // res.redirect(
        //   '../../nos-tech/src/components/subscription/Subscription.js'
        // )
      } else {
        // res.redirect(
        //   '../../nos-tech/src/components/subscription/Subscription.js'
        // )
      }
    }
  })
})

module.exports = router
