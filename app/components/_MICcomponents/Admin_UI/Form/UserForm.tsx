'use client'
import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { toast } from 'react-toastify'
import { useMemberStore } from '@/store/MyStore/MembersStore'
import { MemberForAdmin } from '@/store/Models/Member'
import DepartmentSelect from '../DepartmentSelect/DepartmentSelect'

interface UserFormProps {
  editingMember: {
    NomPrenom: string
    _id: string
    Email: string
    Password: string
    Role: string
    Adresse: string
    ImageLink: string
    DepartmentIds: string[]
  } | null
  setEditingMember: React.Dispatch<React.SetStateAction<any>>
}

const UserForm: React.FC<UserFormProps> = ({
  editingMember,
  setEditingMember
}) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    _id: '',
    NomPrenom: '',
    Email: '',
    Password: '',
    Role: 'member',
    DepartmentIds: [] as string[],
    Adresse: '',
    Image: null
  })

  const convertFormToMemberForAdmin = (form: any): MemberForAdmin => {
    return {
      _id: form._id,
      NomPrenom: form.NomPrenom,
      Email: form.Email,
      Password: form.Password,
      Role: form.Role,
      Adresse: form.Adresse,
      ImageLink: form.Image,
      DepartmentIds: form.DepartmentIds,
      FormattedDepartmentsIds: form.DepartmentIds.join(',')
    }
  }

  const fetchMembersForAdmin = useMemberStore(
    state => state.fetchMembersForAdmin
  )
  const updateMembersForAdmin = useMemberStore(
    state => state.updateMembersForAdmin
  )
  const addMembersForAdmin = useMemberStore(state => state.addMembersForAdmin)

  useEffect(() => {
    if (editingMember) {
      setForm({
        _id: editingMember._id,
        NomPrenom: editingMember.NomPrenom,
        Email: editingMember.Email,
        Password: '',
        Role: editingMember.Role || 'member',
        DepartmentIds: editingMember.DepartmentIds || [],
        Adresse: editingMember.Adresse,
        Image: editingMember.ImageLink || null
      })
      setSelectedDepartments(editingMember.DepartmentIds || [])
    }
  }, [editingMember])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const memberData = convertFormToMemberForAdmin(form)
      console.log(memberData)
      {
        if (editingMember) {
          if (form.Password.trim() === '') {
            memberData.Password = ''
          } else {
            memberData.Password = form.Password
          }
          await updateMembersForAdmin(form._id, memberData)
          toast.success('Membre mis à jour avec succès!', {
            position: 'top-center'
          })
        } else {
          await addMembersForAdmin(memberData)
          toast.success('Membre ajouté avec succès!', {
            position: 'top-center'
          })
        }

        await fetchMembersForAdmin()
      }
      resetForm()
    } catch (error) {
      toast.error("Erreur lors de l'opération", { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      _id: '',
      NomPrenom: '',
      Email: '',
      Password: '',
      Role: 'member',
      DepartmentIds: [],
      Adresse: '',
      Image: null
    })
    setSelectedDepartments([])
    setEditingMember(null)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target
    setForm(prevForm => ({ ...prevForm, [name!]: value }))
  }

  const handleDepartmentChange = (departmentIds: string[]) => {
    setForm(prevForm => ({
      ...prevForm,
      DepartmentIds: departmentIds
    }))
    setSelectedDepartments(departmentIds)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(prevForm => ({ ...prevForm, Image: file }))
    }
  }

  return (
    <Box
      component='form'
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingRight: 1 }}
    >
      <TextField
        label='Nom et Prénom'
        name='NomPrenom'
        value={form.NomPrenom}
        onChange={handleChange}
        required
      />
      <TextField
        label='Email'
        name='Email'
        value={form.Email}
        onChange={handleChange}
        required
      />
      <TextField
        label='Mot de passe'
        name='Password'
        type='password'
        value={form.Password}
        onChange={handleChange}
        required={!editingMember}
      />

      <FormControl fullWidth>
        <InputLabel id='role-select-label'>Rôle</InputLabel>
        <Select
          labelId='role-select-label'
          id='role-select'
          name='Role'
          value={form.Role}
          label='Rôle'
          onChange={handleChange}
          required
          disabled
        >
          <MenuItem value='member'>Membre</MenuItem>
          <MenuItem value='instructor'>Instructeur</MenuItem>
          <MenuItem value='super_admin'>Super Admin</MenuItem>
        </Select>
      </FormControl>

      <DepartmentSelect
        value={selectedDepartments}
        onChange={handleDepartmentChange}
      />

      <TextField
        label='Adresse'
        name='Adresse'
        value={form.Adresse}
        onChange={handleChange}
        required
      />

      <input
        type='file'
        name='Image'
        onChange={handleImageChange}
        accept='image/*'
      />

      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={loading}
      >
        {loading
          ? 'En cours...'
          : editingMember
            ? 'Mettre à jour'
            : 'Ajouter un utilisateur'}
      </Button>
    </Box>
  )
}

export default UserForm
