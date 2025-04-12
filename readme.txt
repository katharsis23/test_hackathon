якщо хочете використати витягнути айді, нікнейм чи любу інфу юзера --> get_user_info

на бажаній сторінці імпортуєте authService

   import authService from "../../services/auth";
 
створюєте змінну для збереження даних, які ви хочете витягати

створюєте функцію виклику get_user_info
рекомендовано використати useEffect
щось на кшталт:

useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await authService.get_user_info();
      if (response) {
        setUsername(response.data.username || response.data.name);
      }
      else {
        alert('Get user info failed.')
      }
    }

    fetchUserInfo();
  }, []);