import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'
import { useUpdateUser } from '../hook/auth/updateUserHook'



// ✅ Validation schema
const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
})

const Settings = () => {

  const { user } = useSelector((state: RootState) => state.auth)
  const { mutate: updateUserMutation, isPending } = useUpdateUser()
  console.log(user)


  const handleUpdateProfile = async (values: any) => {
    try {
      // TODO: call your update API here with axios or react-query mutation
      console.log('Updating profile with:', values)

      toast.success('Profile updated successfully')
      updateUserMutation({ userId: user?.id || '', data: values })
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto flex justify-center flex-col ">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {user ? (
        <Formik
          initialValues={{
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleUpdateProfile}
        >
          {({  }) => (
            <Form className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className="w-full rounded border px-3 py-2 focus:outline-none "
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  className="w-full rounded border px-3 py-2 focus:outline-none"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full rounded border px-3 py-2 focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white rounded py-2 font-medium hover:bg-primary/90"
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p className="text-gray-600">No user logged in.</p>
      )}
    </div>
  )
}

export default Settings
